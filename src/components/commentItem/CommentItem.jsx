import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../shared/Request';
import './style.scss';

function CommentItem({ comment }) {
  const { id } = useParams();
  const [value, setValue] = useState(comment);
  const [editValue, setEditValue] = useState(value);
  const [isEdit, setIsEdit] = useState(false);
  console.log('props', value);
  console.log('update', editValue);

  // 댓글 수정 api
  const editComment = async (payload) => {
    console.log(payload);
    await instance.put(`/lier/comment/${payload.commentid}`, payload.content);
  };

  // 댓글 삭제 api
  const deleteComment = async (payload) => {
    const result = window.confirm('댓글을 정말로 삭제하시겠습니까?');
    if (result) await instance.delete(`/lier/comment/${payload}`);
  };

  return (
    <>
      {isEdit ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default CommentItem;
