/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCardListComponent from "./EventCardListComponent";
import EventCardGridComponent from "./EventCardGridComponent";

export interface EventCardComponentProps {
  key: string;
  className?: string;
  event: any;
  variant: "grid" | "list";
  onClick?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

const EventCardComponent = (props: EventCardComponentProps) => {
  const {
    key,
    className,
    event,
    variant = "grid",
    onClick,
    onDelete,
    showActions = false
  } = props;

  return (variant === "list") ?
    <EventCardListComponent
      key={key}
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
    /> :
    <EventCardGridComponent
      key={key}
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
    />
}

export default EventCardComponent;