import {Link} from 'react-router-dom';
function Notfoundpage() {
  return (
    <div>
      <h1>Hello Notfoundpage</h1>
      <p>
        This is demo react router Notfoundpage
        <Link className="btn-home" to="/">
          home
        </Link>
      </p>
    </div>
  );
}

export {Notfoundpage};
