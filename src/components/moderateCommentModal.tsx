import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const reasonsForModeration = [
  { value: "Political", name: "Political" },
  { value: "Language", name: "Language" },
  { value: "Drugs", name: "Drugs" },
  { value: "Threatening", name: "Threatening" },
  { value: "HateSpeech", name: "Hate Speech" },
  { value: "Shaming", name: "Shaming" },
  { value: "Fraud", name: "Fraud" },
];

export default function ModerateCommentModal(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/comment/${props.commentId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            body: data.body,
            reason: data.reason,
          }),
        }
      );
      const apiData = await response.json();
      console.log(apiData);
      reset();
      props.onHide();
      props.mutate(`/api/comment/byPostId/${props.postId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold" id="contained-modal-title-vcenter">
          Moderating Comment...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label className="fw-bold">Moderated Comment</label>
            <textarea
              {...register("body", {
                required: "Moderated comment is required",
                minLength: {
                  value: 2,
                  message:
                    "The comment must be at least 2 to 280 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "The name must be at least 2 to 280 characters long",
                },
              })}
              name="body"
              className="form-control"
              rows={3}
              required
              placeholder="Type moderated comment..."
            ></textarea>
            {errors.body && (
              <span className="text-danger">{errors.body.message}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="fw-bold">Reason for Moderation</label>
            <select
              {...register("reason", {
                required: "Moderation reason is required",
              })}
              className="form-control form-select"
            >
              <option value="">Pick a reason...</option>
              {reasonsForModeration.map((reason) => (
                <option key={uuidv4()} value={reason.value}>
                  {reason.name}
                </option>
              ))}
            </select>
            {errors.reason && (
              <span className="text-danger">{errors.reason.message}</span>
            )}
          </div>
          <Button
            className="btn-sm btn-dark fs-6 fw-bolder w-100 rounded"
            type="submit"
          >
            SUBMIT
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.onHide();
            reset();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
