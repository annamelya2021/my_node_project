import { createPost } from "../../utils/fetch";
import "./CreatePost.css"
const CreatePost= ({onCreate})=>{

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const title = e.target.title.value;
        const text = e.target.text.value;
        const data = {title,text };
        console.log("name",data)
        const result = await createPost(data);
        console.log("result",result)
        onCreate(result);
    }
    return (
        <form action="" className="create-post" onSubmit={handleSubmit}>
            <label htmlFor="title" >Title</label>
            <input type="text" name="title"/>
            <label htmlFor="text" >Text</label>
            <textarea name="text"></textarea>
            <button type="submit">Create</button>
        </form>
    )
}
export default CreatePost;