import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('project.mappers', () => {
  it('should return empty employee when feeding null value', () => {
    // Arrange
    const project = null;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty employee when feeding undefined value', () => {
    // Arrange
    const project = undefined;

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result but feeding null employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: null,
      employees: null,
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: null,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result but feeding undefined employee list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: null,
      employees: undefined,
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: null,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return expected result feeding correct values', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: 'test external id',
      employees: [
        {
          id: 'test id',
          isAssigned: true,
          employeeName: 'test employee name',
        },
      ],
    };

    const projectResult: viewModel.Project = {
      id: 'test id',
      name: 'test name',
      comments: 'test comments',
      isActive: true,
      externalId: 'test external id',
      employees: [
        {
          id: 'test id',
          isAssigned: true,
          employeeName: 'test employee name',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(projectResult);
  });
});
