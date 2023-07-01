import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useToggle from "@/hooks/useToggle";
import useEditTimestamp from "@/hooks/useEditTimestamp";
import { notifications } from "@mantine/notifications";
import { Card, Text, Button, Flex, Modal, Code, Divider } from "@mantine/core";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { DateInput } from "@mantine/dates";
dayjs.extend(relativeTime);

export default function TimestampItem({ _id, initDate, endDate, created_at }) {
  const { trigger, isMutating } = useEditTimestamp();
  const [isEditable, toggleEditable] = useToggle();
  const initDateF = dayjs(initDate).format("DD-MM-YYYY");
  const endDateF = dayjs(endDate).format("DD-MM-YYYY");
  const createAt = dayjs(created_at).format("DD-MM-YYYY");
  const formatted = dayjs(created_at).toISOString();
  const created = dayjs(formatted).fromNow();

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
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>ID ${_id}</Text>

        <Code mt="1rem" mb="0.5rem" sx={{ display: "block" }}>
          Initial date {initDateF}
        </Code>

        <Code sx={{ display: "block" }}>End date {endDateF}</Code>

        <Divider mt="0.5rem" />

        <Text size="sm" color="dimmed" mt="0.5rem">
          Create at {created}
        </Text>

        <Flex gap="5px" mt="1rem">
          <Button size="xs" variant="light" onClick={toggleEditable}>
            <Text mr="10px">{isEditable ? "Editing..." : "Edit"}</Text>
            <FiEdit3 />
          </Button>

          <Button size="xs" variant="light" color="red">
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
    </>
  );
}
