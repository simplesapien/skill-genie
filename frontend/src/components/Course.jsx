export const Course = ( { props } ) => {
    return (
        <>
            <h1 className="course_name">{props.course_name}</h1>
            <p className="course_description">{props.course_description}</p>
            <br />
            {props.topics.map((topic) => {
                return (
                    <>
                        <h2 className="course_topic_title">{topic.title}</h2>
                        <p className="course_topic_description">{topic.description}</p>
                        {topic.subtopics.map((subtopic) => {
                            return (
                                <>
                                    <h3 className="course_subtopic_title">{subtopic.title}</h3>

                                    {subtopic.articles[0] && subtopic.articles.map((article) => {
                                        return (
                                            <>
                                            <p className="course_subtopic_article"><strong>Article</strong> - <a href={article.link} target="_blank">{article.title}</a></p>
                                            </>
                                        )
                                    })}

                                    {subtopic.videos.map((video) => {
                                        return (
                                            <>
                                            <p className="course_subtopic_video"><strong>Video</strong> - <a href={video.videoId} target="_blank">{video.title}</a></p>
                                            </>
                                        )
                                    })}
                                    <p className="course_subtopic_exercise"><strong>Exercise</strong> - {subtopic.activity[0]}</p>
                                    </>
                                )})}
                                </>
                            )})}
        </>
    )
}