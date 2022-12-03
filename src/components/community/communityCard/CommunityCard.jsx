import { useNavigate } from 'react-router-dom';

import './style.scss';

function CommunityCard({ postDetail }) {
  const navigate = useNavigate();

  return (
    <>
      {postDetail.map((post) => {
        return (
          <div className="communityCardTitleBox" key={post.postId}>
            <div
              className="communityCardBox"
              onClick={() => {
                navigate(`/social/detail/${post.postId}`);
              }}
            >
              <div className="communityCardBoxTitle">{post.title}</div>
              <div className="communityCardBoxViewcnt">{post.viewcnt}</div>
              <div className="communityCardBoxCreatedAt">
                {post.createdAt.slice(0, 10)}
              </div>
            </div>
            <div className="communityAuthorBox">
              <div>{post.author.substring(0, post.author.indexOf('#'))}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommunityCard;
