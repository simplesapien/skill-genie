import React, { useEffect, useState, useId } from 'react';
import { LoadingSpinner } from './LoadingSpinner.jsx';
import { Course } from './Course.jsx';

export const CourseCreation = () => {
    const [data, setData] = useState(null);
    const [courseString, setCourseString] = useState('I wnat to learn about carptentry');
    const [formClicked, setFormClicked] = useState(false);

    function clearForm(){
        setCourseString('');
        setData(null);
    }

    useEffect(() => {
        setCourseString(courseString);
    }, [courseString]);

    function handleSubmit(e) {
        setFormClicked(true);
        e.preventDefault();
        clearForm()

        try {
            fetch(`/api?param=${encodeURIComponent(courseString)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
        }
        catch (error) {
            console.error('Error:', error);
        }   
    }

    return (
        <>
            <h1>Enter your desired course below:</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='course-input'
                    value={courseString}
                    onChange={e => setCourseString(e.target.value)}
                />
                <button type="reset" onClick={clearForm}>Reset form</button>
                <button type="submit">Submit form</button>
            </form>

            {(!data && formClicked) && <LoadingSpinner key={useId} />}
            {data && <Course props={data} key={data.course_name} />}
        </>
    );
}