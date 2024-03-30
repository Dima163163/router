import {Outlet, Link} from 'react-router-dom';

function Aboutpage() {
  return (
    <div>
      <h1>Hello About page</h1>
      <p>This is demo react router aboutpage</p>
      <ul>
        <li>
          <Link to="contacts">Our contacts</Link>
        </li>
        <li>
          <Link to="team">Our team</Link>
        </li>
      </ul>
      {/* <Routes>
        <Route path="contacts" element={<p>Our contact</p>} />
        <Route path="team" element={<p>Our team</p>} />
      </Routes> */}
      <Outlet />
    </div>
  );
}

export {Aboutpage};
