import React from 'react';
import { Container } from 'react-bootstrap';
import classnames from 'classnames';
import Metatag from '../Metatag';

interface ISection {
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Section: React.FunctionComponent<ISection> = ({
  children,
  className,
  title,
  description,
}): React.ReactElement => (
  <>
    <Metatag title={title} description={description} />
    <section className={classnames('section', className)}>
      <Container className={classnames('m-0 p-0 mw-100', className)}>{children}</Container>
    </section>
  </>
);

Section.defaultProps = { className: '', title: '', description: '' };

export default Section;
