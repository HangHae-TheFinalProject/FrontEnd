import { useNavigate } from 'react-router-dom';
import CommunityDetail from '../communityDetail/CommunityDetail';
import './style.scss';
function CommunityCard({ postDetail }) {
  const navigate = useNavigate();
  return (
    <>
      {postDetail.map((post) => {
        return (
          <div
            key={post.postId}
            onClick={() => {
              navigate(`/social/detail/${post.postId}`);
            }}
          >
            <div className="communityCardTitleBox">
              <div className="communityCardBox">
                <div className="communityCardBoxTitle">{post.title}</div>
                <div className="communityCardBoxViewcnt">{post.viewcnt}</div>
                <div className="communityCardBoxCreatedAt">
                  {post.createdAt.slice(0, 10)}
                </div>
              </div>

              <div className="communityAuthorBox">
                <div>{post.author}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommunityCard;
