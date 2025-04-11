import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router";
import { selectAll } from "../../store/selectors/coursesSelectors";
import CoursesList from "./CoursesList";
import CourseForm from "./CourseForm";
import {
  deleteItem,
  getAllCourses,
  saveCourseAsync,
} from "../../store/features/coursesSlice";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const data = useSelector(selectAll);

  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleSaveCourse = () => {
    hideAddCourseForm();
  };

  const showAddCourseForm = () => {
    setIsAddFormShown(true);
  };

  const hideAddCourseForm = () => {
    setIsAddFormShown(false);
  };

  const handleCourseEdit = (courseId) => {
    setIsEditModalShown(true);
    setEditCourseId(courseId);
  };

  const handleCourseDelete = (courseId) => {
    // todo: double-check if user wants to delete
    dispatch(deleteItem(courseId));
  };

  const hideEditModal = () => {
    setIsEditModalShown(false);
  };

  return (
    <div>
      <h3>CoursesPage</h3>
      <Button type="primary" onClick={showAddCourseForm}>
        Add Course
      </Button>
      {isAddFormShown && <CourseForm onSave={handleSaveCourse} />}
      <CoursesList
        items={data}
        onOpen={handleOpenCourse} 
        onEdit={handleCourseEdit}
        onDelete={handleCourseDelete}
      />

      <Modal
        title="Edit Course"
        open={isEditModalShown}
        onCancel={hideEditModal}
      >
        <CourseForm courseId={editCourseId} onSave={hideEditModal} />
      </Modal>
    </div>
  );
}
