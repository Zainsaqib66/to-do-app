'use client';
import TodoList from '../../components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 custom-bg">
      <div className="container p-4 rounded shadow-lg custom-box">
        <TodoList />
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f8f9fa;
        }

        .custom-bg {
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
        }

        .custom-box {
          max-height: 500px;
          overflow-y: auto;
          background-color: #ffffff;
        }

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .custom-bg {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #f8f9fa;
          }

          .custom-box {
            background-color: #1e293b !important;
            color: #f8fafc;
          }

          .shadow-lg {
            box-shadow: 0 0 2rem rgba(255, 255, 255, 0.1) !important;
          }
        }
      `}</style>
    </main>
  );
}
