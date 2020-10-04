import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from '@chakra-ui/core'
import { PageProps } from '../interfaces';

const CoursesPage: React.FC<PageProps> = ({ title }) => {
  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="sm">
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/courses">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  )
}

export default CoursesPage

