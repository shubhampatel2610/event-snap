/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCardListComponent from "./EventCardListComponent";
import EventCardGridComponent from "./EventCardGridComponent";

export interface EventCardComponentProps {
  className?: string;
  event: any;
  variant: "grid" | "list";
  onClick?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const EventCardComponent = (props: EventCardComponentProps) => {
  const {
    className,
    event,
    variant = "grid",
    onClick,
    onDelete,
    showActions = false
  } = props;

  return (variant === "list") ?
    <EventCardListComponent
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
    /> :
    <EventCardGridComponent
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
    />
}

export default EventCardComponent;