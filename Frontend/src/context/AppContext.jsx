import { createContext, useEffect, useState } from "react"
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()
export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCoures, setAllCoures] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);


    // fetch all course 
    const fetchAllCourse = async () => {
        setAllCoures(dummyCourses)
    }

    // Function to calculate avrage Rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        })
        return (totalRating / course.courseRatings.length);
    }
    // function to calculate Course Chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, { units: ["h", 'm'] })
    }

    // function to calculate Course Duration

    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000, { units: ["h", 'm'] })
    }

    // fuction to calculate the no of lecture in the course

    const calculateNoOfLecture = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;

    }

    // fetch User Enrolled 
    const fetchUserEnrolledCourse = async () => {
        setEnrolledCourses(dummyCourses)
    }


    useEffect(() => {
        fetchAllCourse(),
            fetchUserEnrolledCourse()
    }, [])


    const value = {
        currency, allCoures, navigate, calculateRating, isEducator, setIsEducator, calculateCourseDuration, calculateNoOfLecture, calculateChapterTime,enrolledCourses, setEnrolledCourses,fetchUserEnrolledCourse
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}