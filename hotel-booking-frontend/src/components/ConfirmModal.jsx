import "../styles/pages.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Confirmation</h3>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="btn modal-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn modal-cancel" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
