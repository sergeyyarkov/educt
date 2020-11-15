import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { INavLinksProps } from '../../interfaces';
import NavLink from './NavLink';

/**
 *
 * NavLinks component
 * Returns a list of NavLink component
 *
 */

export type ActiveLinkState = {
  title: string | null
}

const NavLinks: React.FC<INavLinksProps> = ({ links }) => {
  const [activeLink, setActiveLink] = useState<ActiveLinkState>({
    title: null,
  });
  const history = useHistory();

  const handleRoute = (location: string): void => history.push(location);
  const handleOnHoverLink = (title: string): void => setActiveLink({ title });
  const handleOnLeaveLink = (): void => setActiveLink({ title: null });

  return (
    <React.Fragment>
      {links.map((link, i) => (
          <NavLink 
            handleOnHoverLink={handleOnHoverLink} 
            handleOnLeaveLink={handleOnLeaveLink} 
            handleRoute={handleRoute}
            activeLink={activeLink}
            history={history}
            link={link}
            key={i}
          />
        )
      )}
    </React.Fragment>
  );
};

export default NavLinks;
