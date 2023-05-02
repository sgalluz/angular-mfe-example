import {
  getManifest,
  loadRemoteModule,
  LoadRemoteModuleOptions,
  Manifest,
  RemoteConfig
} from '@angular-architects/module-federation';
import { v4 as uuid } from 'uuid';
import { MfeConfig, MfeModule } from '../config';

type AngularRemoteModule = RemoteConfig & {
  moduleName: string,
  exposedModule: string,
  displayName: string
}

type RemoteInstanceConfig = AngularRemoteModule;
type CustomManifest = Manifest<RemoteInstanceConfig>;

export class RouteLoader {

  constructor(private routePath: string) { }

  lazyLoadRemoteModule = <T = any>(remoteName: string): Promise<T> => {
    const manifest: CustomManifest = getManifest<CustomManifest>();
    const hasConfDefined = Object.keys(manifest)?.includes(remoteName);
    if (!hasConfDefined) {
      throw new Error('Impossible to load requested remote instance from manifest: missing configuration');
    }
    return this.loadRemote(manifest, remoteName);
  }

  private loadRemote = (manifest: CustomManifest, remoteName: string) => {
    const customConfig: AngularRemoteModule = manifest[remoteName];
    const remoteModuleOptions: LoadRemoteModuleOptions = {
      type: 'manifest',
      remoteName,
      exposedModule: customConfig.exposedModule
    }

    return loadRemoteModule(remoteModuleOptions)
      .catch(console.error)
      .then(moduleWrapper => this.bootstrapModule(moduleWrapper, customConfig));
  }

  private bootstrapModule = (moduleWrapper: any, customConfig: AngularRemoteModule) => {
    const moduleClass = moduleWrapper[customConfig.moduleName];
    if (!(<MfeModule>moduleClass?.mfeModule instanceof Function)) return moduleClass;

    const mfeConfig: MfeConfig = { uuid: uuid(), routePath: this.routePath }
    return <MfeModule>moduleClass?.mfeModule(mfeConfig);
  }
}
