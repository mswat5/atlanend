import { useState } from "react";
import { useStore } from "@/store/useStore";
import { ScheduledActivity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Trash2,
  Edit3,
  GripVertical,
  Sun,
  Moon,
  Coffee,
  Sunset,
  Plus,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const timeSlots = [
  {
    id: "morning",
    label: "Morning",
    icon: Coffee,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    icon: Sun,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "evening",
    label: "Evening",
    icon: Sunset,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "night",
    label: "Night",
    icon: Moon,
    color: "bg-blue-100 text-blue-800",
  },
];

interface ScheduledActivityCardProps {
  activity: ScheduledActivity;
  day: "saturday" | "sunday";
}

function ScheduledActivityCard({ activity, day }: ScheduledActivityCardProps) {
  const { removeActivityFromSchedule, updateScheduledActivity } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    scheduledTime: activity.scheduledTime || "",
    notes: activity.notes || "",
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    updateScheduledActivity(activity.id, day, editData);
    setIsEditing(false);
  };

  const timeSlot = timeSlots.find((slot) => slot.id === activity.scheduledTime);
  const TimeIcon = timeSlot?.icon || Clock;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-3 transition-all duration-200 ${
        isDragging
          ? "shadow-lg rotate-2 scale-105 opacity-50"
          : "hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:cursor-grabbing p-1 rounded hover:bg-gray-100"
            >
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            <CardTitle className="text-sm font-medium">
              {activity.title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Edit3 className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Activity</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Time Slot</label>
                    <select
                      value={editData.scheduledTime}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          scheduledTime: e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea
                      value={editData.notes}
                      onChange={(e) =>
                        setEditData({ ...editData, notes: e.target.value })
                      }
                      placeholder="Add notes or specific time..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeActivityFromSchedule(activity.id, day)}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-2">
            <TimeIcon className="w-3 h-3" />
            <span>{activity.duration} min</span>
          </div>
          {timeSlot && (
            <Badge variant="secondary" className={timeSlot.color}>
              {timeSlot.label}
            </Badge>
          )}
        </div>
        {activity.notes && (
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
            {activity.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface DayScheduleProps {
  day: "saturday" | "sunday";
  activities: ScheduledActivity[];
}

function DaySchedule({ day, activities }: DayScheduleProps) {
  const {
    reorderScheduleActivities,
    getFilteredActivities,
    addActivityToSchedule,
  } = useStore();
  const availableActivities = getFilteredActivities().filter(
    (a) => a.isSelected
  );

  const totalDuration = activities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = activities.findIndex((item) => item.id === active.id);
      const newIndex = activities.findIndex((item) => item.id === over?.id);

      reorderScheduleActivities(day, oldIndex, newIndex);
    }
  }

  return (
    <Card className="h-full glass-effect shadow-lg animate-fade-in">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 sm:space-x-3">
            <div
              className={`p-2 rounded-lg ${
                day === "saturday"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="capitalize text-lg sm:text-xl font-bold">
              {day}
            </span>
          </CardTitle>
          <div className="text-xs sm:text-sm text-gray-500 font-medium">
            {hours > 0 && `${hours}h `}
            {minutes}m total
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="min-h-[200px]">
          {activities.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-400 animate-fade-in">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 opacity-30" />
              <p className="text-sm sm:text-base font-medium">
                No activities scheduled
              </p>
              <p className="text-xs sm:text-sm mt-1 text-gray-500">
                Drag activities here or select from available activities
              </p>
              {availableActivities.length > 0 && (
                <div className="mt-4 sm:mt-6 space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Quick Add:
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                    {availableActivities.slice(0, 3).map((activity) => (
                      <Button
                        key={activity.id}
                        variant="outline"
                        size="sm"
                        onClick={() => addActivityToSchedule(activity.id, day)}
                        className="text-xs h-6 sm:h-7 button-hover glass-effect"
                      >
                        <Plus className="w-3 h-3 mr-1 sm:mr-1.5" />
                        {activity.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={activities.map((a) => a.id)}
                strategy={verticalListSortingStrategy}
              >
                {activities.map((activity) => (
                  <ScheduledActivityCard
                    key={activity.id}
                    activity={activity}
                    day={day}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function WeekendSchedule() {
  const { schedule } = useStore();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 sm:mb-3">
          Your Weekend Schedule
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Drag activities to reorder, click to edit details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <DaySchedule day="saturday" activities={schedule.saturday} />
        <DaySchedule day="sunday" activities={schedule.sunday} />
      </div>
    </div>
  );
}
