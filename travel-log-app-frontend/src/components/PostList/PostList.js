
import ListItem from "./ListItem";
import './PostList.css'




const PostList = ({ posts, onDelete, onEdit }) => {
    return (
        <ul>
            {posts.map((post) =>
                <ListItem key={post._id} post={post} onDelete={onDelete} onEdit={onEdit} />
            )}

        </ul>
    )

}

export default PostList