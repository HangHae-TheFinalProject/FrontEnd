import { useNavigate } from 'react-router-dom';

import './style.scss';

function CommunityCard({ postDetail }) {
  console.log(postDetail);
  const navigate = useNavigate();

  return (
    <>
      {postDetail.map((post) => {
        return (
          <div className="communityCardTitleBox fontBold" key={post.postId}>
            <div
              className="communityCardBox"
              onClick={() => {
                navigate(`/social/detail/${post.postId}`);
              }}
            >
              <div className="communityCardBoxTitle">{post.title}</div>
              <div className="communityCardBoxViewcnt fontSemiBold">
                {post.viewcnt}
              </div>
              <div className="communityCardBoxCreatedAt fontSemiBold">
                {post.createdAt.slice(0, 10)}
              </div>
            </div>
            <div className="communityAuthorBox">
              {post.author.substring(0, post.author.indexOf('#'))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommunityCard;
