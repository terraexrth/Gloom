import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";

import {
  getProjectById,
  getProjects,
  getUserProject,
} from "../../service/project";
import CreateProjectModal from "../../component/Modal/CreateProjectModal";
import DeleteProjectModal from "../../component/Modal/DeleteProjectModal";
import Sidebar from "../../component/Sidebar";
import { authMe } from "../../service/user";
import CardProject from "../../component/Card/Project/CardProject";
import CreateProjectCard from "../../component/Card/ProjectCreate/CreateProjectCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectProject, setSelectProject] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  

  const onAuthMe = async () => {
    try {
      const request = await authMe();
      setUser(request);
    } catch (e) {
      console.error(e);
    }
  };


 
  const onGetUserProject = async () => {
    try {
      if (user && user.id) {
        const projectsData = await getUserProject(user.id);
        setProjects(projectsData);
      } else {
        console.log("User invalid");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onAuthMe();
	document.title = "Gloom";

  }, []);



  useEffect(() => {
    if (user && user.id) {
      onGetUserProject();
    }
  }, [user]);

  

  const handleModalOpen = async () => {
    setProjectModalOpen(!projectModalOpen);
  };

 

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleGetProjectById = async (id) => {
    try {
      const projectData = await getProjectById(id);
      setSelectProject(projectData);
    } catch (e) {
      console.error(e);
    }
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        scrollContainer.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', onWheel);
    }

    // Clean up event listener on component unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', onWheel);
      }
    };
  }, []);


  return (
    <div className="dashboard_container">
      <Sidebar />
		
      <div className="card_container">
        <div className="card_wrapper">
		
          <CardProject
		  	scrollRef={scrollRef}
            request={projects}
            handleGetProjectById={handleGetProjectById}
            setDeleteModalOpen={setDeleteModalOpen}
			handleModalOpen={handleModalOpen}
          />
		  

          {projectModalOpen && (
            <CreateProjectModal
              onGetAllProject={onGetUserProject}
              request={user}
              handleModalOpen={handleModalOpen}
            />
          )}
          {deleteModalOpen && (
            <DeleteProjectModal
              setDeleteModalOpen={setDeleteModalOpen}
              project={selectProject}
              handleCloseDeleteModal={handleCloseDeleteModal}
              onGetAllProject={onGetUserProject}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
