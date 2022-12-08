import React, { useState } from 'react';
import instance from '../../../shared/Request';
import './style.scss';

function CommentItem({ comment, setIsLoading, nickname }) {
  const [editValue, setEditValue] = useState(comment);
  const [isEdit, setIsEdit] = useState(false);

  // 댓글 수정 api
  const editComment = (payload) => {
    try {
      if (editValue.content.trim() === '') return alert('내용을 입력해주세요');
      instance
        .put(`/lier/comment/${payload.commentid}`, payload.content)
        .then((response) => {
          setIsEdit(false);
          alert(response.data.data);
        });
    } catch (error) {
      setIsEdit(false);
    }
  };

  // 댓글 삭제 api
  const deleteComment = (payload) => {
    setIsLoading(true);
    const result = window.confirm('댓글을 정말로 삭제하시겠습니까?');
    if (result)
      instance
        .delete(`/lier/comment/${payload}`)
        .then((response) => {
          alert(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
  };

  return (
    <>
      {isEdit ? (
        <div className="commentEditInputContainer">
          <textarea
            className="commentEditInput fontBold"
            value={editValue.content}
            onChange={(e) =>
              setEditValue({ ...editValue, content: e.target.value })
            }
          ></textarea>
          <div className="commentEditBtn">
            <button
              className="editCancelBtn fontBold"
              onClick={() => setIsEdit(false)}
            >
              취소하기
            </button>
            <button
              className="editRegisterBtn fontBold"
              onClick={() =>
                editComment({
                  commentid: editValue.commentid,
                  content: editValue,
                })
              }
            >
              댓글등록
            </button>
          </div>
        </div>
      ) : (
        <div className="comment">
          <div className="commentFirstLine">
            <div>
              <span className="commentAuthor">
                {editValue.author}
              </span>
              <span className="commentDate fontRegular">
                &nbsp;&nbsp;|&nbsp;&nbsp;{editValue.createdAt}
              </span>
            </div>
            <div className="commentBtn">
              {nickname === comment.author ? (
                <>
                  <span onClick={() => setIsEdit(true)}>댓글 수정</span>
                  <span onClick={() => deleteComment(editValue.commentid)}>
                    삭제
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <span className="commentContent">{editValue.content}</span>
        </div>
      )}
    </>
  );
}

export default CommentItem;
