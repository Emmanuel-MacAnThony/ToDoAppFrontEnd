import http from "./httpService.js";
import apiUrl from "../config.json";

const taskUrl = apiUrl.apiUrl;

export function getTasks() {
  return http.get(taskUrl + "/task-list/");
}

export function createTask(task) {
  if (task.id) {
    const body = { ...task };
    delete body.id;
    return http.put(taskUrl + "/task-update/" + task.id + "/", body);
  }
  const body = { ...task };
  delete body.id;
  return http.post(taskUrl + "/task-create/", task);
}

export function deleteTask(task) {
  return http.delete(taskUrl + "/task-delete/" + task.id + "/");
}
