import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    textTransform: "none",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  space: {
    width: theme.spacing(2), // Définissez la largeur de l'espace ici
  },
}));

export default function EtatTache() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/getTaskEnAttente",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const eventData = await response.json();
        setTasks(eventData);
      } else {
        throw new Error(
          "Erreur lors de la récupération des données du serveur."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleAcceptAppointment = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/auth/accept/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ etat: "accepter" }), // Envoyer les données de la demande
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'état de la tâche.");
      }
      // Mettre à jour localement l'état de la tâche après la mise à jour réussie
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, etat: "accepter" } : task
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleRejectAppointment = async (taskId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/auth/delete/${taskId}`, // Utilisation de l'ID de la tâche dans l'URL
        {
          method: "DELETE", // Utilisation de la méthode DELETE pour supprimer la tâche
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la tâche.");
      }
      // Supprimer localement la tâche après la suppression réussie
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className={classes.root}>
          <div>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body1">Date: {task.start_time}</Typography>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              variant="outlined"
              onClick={() => handleAcceptAppointment(task.id)} // Utilisation d'une fonction fléchée pour passer l'ID de la tâche
              startIcon={<Check />}
              className={classes.buttonText}
            ></Button>
            <div className={classes.space}></div> {/* Espace de 2 unités */}
            <Button
              variant="outlined"
              onClick={() => handleRejectAppointment(task.id)} // Utilisation d'une fonction fléchée pour passer l'ID de la tâche
              startIcon={<Close />}
              className={classes.buttonText}
            ></Button>
          </div>
        </div>
      ))}
    </div>
  );
}
