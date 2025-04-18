'use client';
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="custom-backdrop d-flex justify-content-center align-items-center">
      <div className="modal-content-box p-4 rounded shadow">
        <h5 className="mb-4">{message}</h5>
        <div className="d-flex gap-3">
          <button type="button" className="btn btn-success flex-fill" onClick={onConfirm}>
            Yes
          </button>
          <button type="button" className="btn btn-danger flex-fill" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1050;
        }

        .modal-content-box {
          background-color: #ffffff;
          color: #212529;
          max-width: 400px;
          width: 90%;
          z-index: 1051;
          transition: all 0.3s ease-in-out;
        }

        @media (prefers-color-scheme: dark) {
          .modal-content-box {
            background-color: #1e293b;
            color: #f1f5f9;
            box-shadow: 0 0 2rem rgba(255, 255, 255, 0.05);
          }

          .btn-success {
            background-color: #16a34a;
            border-color: #16a34a;
          }

          .btn-danger {
            background-color: #dc2626;
            border-color: #dc2626;
          }

          .btn-success:hover {
            background-color: #15803d;
            border-color: #15803d;
          }

          .btn-danger:hover {
            background-color: #b91c1c;
            border-color: #b91c1c;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
