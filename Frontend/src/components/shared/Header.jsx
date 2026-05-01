import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

/**
 * @description
 * Header component that displays the app name and a button-like link to create a new note.
 * The link redirects to the create note page.
 * Both displayed as header on the app.
 * @returns {JSX.Element}
 */
const Header = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              NoteTaking
            </h1>
          </Link>
          <Link
            to="/create"
            className="btn btn-primary text-base-100 align-middle align-text-center"
          >
            <PlusIcon className="w-4 h-4" />
            New
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
