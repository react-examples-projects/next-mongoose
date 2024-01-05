import { notifications } from "@mantine/notifications";
import {
  Card,
  Text,
  Button,
  Flex,
  Modal,
  Code,
  Badge,
  Box,
} from "@mantine/core";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { DateInput } from "@mantine/dates";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToggle from "@/hooks/useToggle";
import useEditTimestamp from "@/hooks/useEditTimestamp";
import Countdown from "./CountDown";
import Atropos from "atropos";
import useDeleteTimestamp from "@/hooks/useDeleteTimestamp";
dayjs.extend(relativeTime);

export default function TimestampItem({
  _id,
  validated,
  initDate,
  endDate,
  created_at,
}) {
  const { trigger, isMutating } = useEditTimestamp();
  const { trigger: deleteTimestamp, isMutating: isDeletingTimestamp } =
    useDeleteTimestamp();

  const [isEditable, toggleEditable] = useToggle();
  const initDateF = dayjs(initDate).format("DD-MM-YYYY");
  const endDateF = dayjs(endDate).format("DD-MM-YYYY");
  const createAt = dayjs(created_at).format("DD-MM-YYYY");
  const formatted = dayjs(created_at).toISOString();
  const created = dayjs(formatted).fromNow();
  const elRef = useRef(null);

  useEffect(() => {
    const myAtropos = Atropos({
      el: elRef.current,
      rotateXMax: 5,
      rotateYMax: 5,
      shadow: false,
      activeOffset: 30,
      // rest of parameters
    });
    return () => myAtropos.destroy();
  }, [_id]);

  const onSubmit = async (e = Event.prototype) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await trigger([_id, fd]);
      notifications.show({
        title: "Timestamp edited successfully",
        message: "Your timestamp have been edited successfully",
        color: "green",
      });
      toggleEditable();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="atropos my-atropos"
      ref={elRef}
      style={{ cursor: "move" }}
    >
      <div className="atropos-scale">
        <div className="atropos-rotate">
          <div className="atropos-inner">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Flex align="center" justify="space-between" mb="0.5rem">
                <Code
                  display="flex"
                  py={5}
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Text c="dimmed" fw={700} fz="xs">
                    {_id}
                  </Text>
                </Code>

                <Badge color={validated ? "green" : "red"}>
                  {validated ? "Validated" : "No validated"}
                </Badge>
              </Flex>

              <Flex align="center" gap={5}>
                <Card
                  shadow="sm"
                  padding="md"
                  radius="md"
                  style={{ flex: 1 }}
                  withBorder
                >
                  <Text fz="sm" fw={700}>
                    Initial date
                  </Text>
                  <Text>{initDateF}</Text>
                </Card>

                <Card
                  shadow="sm"
                  padding="md"
                  radius="md"
                  style={{ flex: 1 }}
                  withBorder
                >
                  <Text fz="sm" fw={700}>
                    End date
                  </Text>
                  <Text>{endDateF}</Text>
                </Card>
              </Flex>

              <Card shadow="sm" padding="md" radius="md" mt={5} withBorder>
                <Text size="sm" color="dimmed" mt="0.5rem">
                  Create at {created}
                </Text>

                <Countdown date={new Date(endDate)} />
              </Card>

              <Flex gap="4px" mt="0.5rem">
                <Button size="xs" variant="light" onClick={toggleEditable}>
                  <Text mr="10px">{isEditable ? "Editing..." : "Edit"}</Text>
                  <FiEdit3 />
                </Button>

                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => deleteTimestamp(_id)}
                >
                  <Text mr="10px">Delete</Text> <FiTrash />
                </Button>
              </Flex>
            </Card>

            <Modal
              opened={isEditable}
              onClose={toggleEditable}
              title="Edit timestamp"
              centered
            >
              <form onSubmit={onSubmit} autoComplete="off">
                <DateInput
                  mb="1rem"
                  label="Initial date"
                  defaultValue={new Date(initDate)}
                  placeholder="Initial date"
                  name="initDate"
                />

                <DateInput
                  label="End date"
                  defaultValue={new Date(endDate)}
                  placeholder="End date"
                  name="endDate"
                />

                <Button
                  mt="1rem"
                  type="submit"
                  disabled={isMutating}
                  loading={isMutating}
                  fullWidth
                >
                  Accept
                </Button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
