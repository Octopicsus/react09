import { Button, Modal } from "antd";
import StudentsForm from "./StudentsForm";
import StudentsList from "./StudentsList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../../store/selectors/studentsSelectors";
import { deleteItem, getAllStudents } from "../../store/features/studentsSlice";

export default function StudentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  const data = useSelector(selectAll);

  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [editStudentId, setEditStudentId] = useState('');

  const showAddStudentForm = () => {
    setIsAddFormShown(true);
  }
  const handleSaveStudent = () => {
    hideAddStudentForm();
  }
  const hideAddStudentForm = () => {
    setIsAddFormShown(false);
  }
  const handleStudentEdit = studentId => {
    setIsEditModalShown(true);
    setEditStudentId(studentId);
  }
  const handleStudentDelete = (studentId) => {
    dispatch(deleteItem(studentId));
  }
  const hideEditModal = () => {
    setIsEditModalShown(false);
  }

  return (
    <div>
      <h3>Students page</h3>
      <Button type="primary" onClick={showAddStudentForm}>Add Student</Button>
      {isAddFormShown && <StudentsForm onSave={handleSaveStudent} />}
      <StudentsList items={data} onEdit={handleStudentEdit} onDelete={handleStudentDelete}  />

      <Modal title="Edit Student" open={isEditModalShown} onCancel={hideEditModal}>
        <StudentsForm studentId={editStudentId} onSave={hideEditModal} />
      </Modal>
    </div>
  )
}



