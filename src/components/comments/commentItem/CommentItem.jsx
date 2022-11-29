import React, { useState } from 'react';
import instance from '../../../shared/Request';
import './style.scss';

function CommentItem({ comment }) {
  const [value, setValue] = useState(comment);
  const [editValue, setEditValue] = useState(value);
  const [isEdit, setIsEdit] = useState(false);

  // 댓글 수정 api
  const editComment = async (payload) => {
    try {
      if (editValue.trim() === '') return alert('내용을 입력해주세요');
      await instance
        .put(`/lier/comment/${payload.commentid}`, payload.content)
        .then((response) => {
          alert(response.data.data);
        });
    } catch (error) {
      console.log('댓글 수정', error);
    }
  };

  // 댓글 삭제 api
  const deleteComment = async (payload) => {
    try {
      const result = window.confirm('댓글을 정말로 삭제하시겠습니까?');
      if (result)
        await instance.delete(`/lier/comment/${payload}`).then((response) => {
          alert(response.data.data);
        });
    } catch (error) {
      console.log('댓글 삭제', error);
    }
  };

  return (
    <>
      {isEdit ? (
        <div className="commentEditInputContainer">
          <textarea
            className="commentEditInput fontBold"
            value={editValue.content}
            onChange={(e) => setEditValue(e.target.value)}
          >
            {value.content}
          </textarea>
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
                  commentid: value.commentid,
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
              <span className="commentAuthor">{value.author}</span>
              <span className="commentDate fontRegular">
                &nbsp;&nbsp;|&nbsp;&nbsp;{value.createdAt}
              </span>
            </div>
            <div className="commentBtn">
              <span onClick={() => setIsEdit(true)}>댓글 수정</span>
              <span onClick={() => deleteComment(value.commentid)}>삭제</span>
            </div>
          </div>
          <span className="commentContent">{value.content}</span>
        </div>
      )}
    </>
  );
}

export default CommentItem;
