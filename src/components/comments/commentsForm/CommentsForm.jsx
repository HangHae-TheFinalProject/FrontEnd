import CommentPost from '../commentPost/CommentPost';
import CommentItem from '../commentItem/CommentItem';

import './style.scss';

function CommentsForm({ postId, comments, setIsLoading, nickname }) {
  return (
    <div className="commentsLayout">
      <span className="commentsCount fontBold">{`댓글 ${comments.length}`}</span>
      <div className="commentItem">
        {comments &&
          comments.map((comment) => (
            <CommentItem
              key={comment.commentid}
              comment={comment}
              setIsLoading={setIsLoading}
              nickname={nickname}
            />
          ))}
      </div>
      <CommentPost postId={postId} setIsLoading={setIsLoading} />
    </div>
  );
}

export default CommentsForm;
