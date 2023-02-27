import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
// import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import './VisSortableItem.css';

const DragHandle = sortableHandle(() => (
  <div className="drag-handle">
    <FontAwesomeIcon icon={faGripLines} />
  </div>
));

export function VisSortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return(
  <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <DragHandle />
    <div className="truncated-text" title={props.label}>
      {props.label}
    </div>

    <div className="input-box">
      <input
        type="checkbox"
        checked={props.isShow}
        onChange={props.onCheckChanged}
        value={props.dataKey}
      />
    </div>
  </div>
)};
