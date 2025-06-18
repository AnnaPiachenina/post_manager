//vypis komentaru uzivatelu 

function CommentList({ comments }) {
    return (
        <div>
            <ul>
                {comments.map((c) => (
                    <li key={c.id}>
                        <strong>{c.email}</strong> {c.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}
  
export default CommentList;
  