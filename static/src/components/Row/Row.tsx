import React, { useImperativeHandle, useRef } from 'react';
import { XYCoord } from 'dnd-core';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

export interface RowProps {
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
  isDragging: boolean;
  children: any;
  index: number;
  id: any;
}

interface RowInstance {
  getNode(): HTMLDivElement | null
}

const RowComponent = React.forwardRef<HTMLDivElement, RowProps>(
  ({ children, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);

    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0 : 1;

    useImperativeHandle<any, RowInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }));

    return (
      <tr ref={elementRef} style={{ opacity, cursor: 'move' }}>
        {children}
      </tr>
    )
  },
);

export const Row = DropTarget(
  'Row',
  {
    hover(
      props: RowProps,
      monitor: DropTargetMonitor,
      component: RowInstance,
    ) {
      if (!component) {
        return null
      }

      const node = component.getNode();

      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem().Error;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = node.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      props.moveRow(dragIndex, hoverIndex);

      monitor.getItem().Error = hoverIndex
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'Row',
    {
      beginDrag: (props: RowProps) => ({
        index: props.index,
        id: props.id,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(RowComponent),
);
