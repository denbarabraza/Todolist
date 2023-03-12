import React, { memo, useCallback } from 'react';

import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { TaskStatuses, TaskType } from '../../api/api';
import { SuperEditbleSpan } from '../../common/components/SuperEditbleSpan';
import { RootDispatch } from '../../store/store';

import { removeTasksTC, updateTaskTC } from './taskReducer';

import s from 'common/styles/TaskItem.module.css';

type TaskPropsType = {
  task: TaskType;
  todoID: string;
  disabled: boolean;
};

export const Task: React.FC<TaskPropsType> = memo(({ task, todoID, disabled }) => {
  const dispatch = RootDispatch();

  const onClickRemoveTask = useCallback(() => {
    dispatch(removeTasksTC(todoID, task.id));
  }, [todoID, task]);
  const onChangeTaskStatus = useCallback(
    (taskID: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todoID, taskID, { status }));
    },
    [todoID, task],
  );
  const setUpTasksTitle = useCallback(
    (upValue: string) => {
      dispatch(updateTaskTC(todoID, task.id, { title: upValue }));
    },
    [todoID, task],
  );

  return (
    <div key={task.id} className={s.taskItem}>
      <div className={s.taskInfo}>
        <input
          type="checkbox"
          checked={task.status === TaskStatuses.Completed}
          onChange={e =>
            onChangeTaskStatus(
              task.id,
              e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            )
          }
        />
        <SuperEditbleSpan
          title={task.title}
          callback={upValue => setUpTasksTitle(upValue)}
        />
      </div>

      <IconButton aria-label="delete" onClick={onClickRemoveTask} disabled={disabled}>
        <Delete />
      </IconButton>
    </div>
  );
});
