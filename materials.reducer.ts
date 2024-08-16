import { createFeature, createReducer, on } from '@ngrx/store';
import * as materialsAction from './materials.actions';
import { Folder, Material } from '../interfaces';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

export interface materialState {
  folders: Folder[],
  folder: Folder,
  status: LoadingStatus,
  materials: Material[]
}

export const initialState: materialState = {
  folders: [],
  folder: {id: 0, created_at: 0, title: ''},
  status: 'init',
  materials: []
}

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:  createReducer(
    initialState,
    on(materialsAction.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(materialsAction.loadFoldersSucces, (state, {folders}) => ({
        ...state,
        folders: folders,
        status: 'loaded' as const
    })),
    on(materialsAction.deleteFolderSucces, (state, {id}) => ({
        ...state,
        folders: state.folders.filter((item: Folder) => item.id !== id)
    })),
    on(materialsAction.deleteMaterialSucces, (state, {id}) => ({
        ...state,
        materials: state.materials.filter((item: Material) => item.id !== id)
    })),
    on(materialsAction.addFolderSucces, (state, {folder}) => ({
      ...state,
      folders: [...state.folders, folder]
    })),
    on(materialsAction.loadFolderId, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(materialsAction.loadFolderIdSucces, (state, {folder}) =>({
      ...state,
      folder: folder,
      status: 'loaded' as const
    })),
    on(materialsAction.loadMaterial, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(materialsAction.loadMaterialSucces,(state, {mats}) => ({
      ...state,
      status: 'loaded' as const,
      materials: mats
    })),
    on(materialsAction.addMaterialSucces, (state, {mat}) => ({
      ...state,
      materials: [...state.materials, mat]
    }))
  ),
});
