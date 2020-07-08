import React from 'react';
import PropTypes from '../../utils/propTypes';
import bn from '../../utils/bemnames';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import TokenService from '../../services/Token.js';
import Role from '../../services/Roles.js';
import Typography from '../Typography';
import './Page.css';

const bem = bn.create('page');

export default function Page({
  title,
  breadcrumbs,
  tag: Tag,
  className,
  children,
  addCarButton,
  addGarageButton,
  onClickCreateGarage,
  history,
  ...restProps
}) {
  const classes = bem.b('px-3', className); return (
    <Tag className={classes} {...restProps}>
      <div className={bem.e('header')}>
        {title && typeof title === 'string' ? (
          <Typography type="h1" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
            title
          )}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem>Acasa</BreadcrumbItem>
            {breadcrumbs.length !== 0 &&
              breadcrumbs.map(({ name, active }, index) => (
                <BreadcrumbItem key={index} active={active}>
                  {name}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}
        {addCarButton && TokenService.getUserRole() === Role.User ?
          <Button className="btn-success ml-auto align-middle" id="addCar" onClick={(e) => history.push("/add/car")}>Adauga o noua masina</Button>
          : null
        }

        {addGarageButton && TokenService.getUserRole() === Role.User ?
          <Button className="btn-success align-middle" id="addGarage" onClick={(e) => { onClickCreateGarage(e) }}>Creeaza garaj</Button>
          : null
        }

      </div>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
  addCarButton: PropTypes.bool,
  history: PropTypes.object,
};

Page.defaultProps = {
  tag: 'div',
  title: '',
};