import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

function Questionpopup({ open, handleClose, questions }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md" // <-- Change the maxWidth property here
      fullWidth={true} // <-- Add this property to make the dialog occupy the full width of its parent container
    >
      <DialogTitle>Questions</DialogTitle>
      <DialogContent>
        {questions.map((q, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>
              Enonce:
            </Typography>
            <Typography variant="body1">{q.enonceQuestion}</Typography>
            <Typography variant="h6" gutterBottom>
              Question:
            </Typography>
            <Typography variant="body1">{q.texteQuestion}</Typography>
            {index !== questions.length - 1 && (
              <Divider
                style={{
                  margin: "16px 0",
                  height: "10px",
                  backgroundColor: "green",
                }}
              />
            )}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Questionpopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      texteQuestion: PropTypes.string.isRequired,
      enonceQuestion: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Questionpopup;
