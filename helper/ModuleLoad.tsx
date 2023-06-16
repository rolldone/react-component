import React from "react";
import loadjs from 'loadjs';

interface PropsInterface {
  initModule: { (appId: string): void }
  urls: Array<string>
}

export default class ModuleLoad extends React.Component<PropsInterface, any> {

  appId: string = "sub-app";
  nameLoad: string = Math.random().toString(36).substring(2, 10);

  componentDidMount(): void {
    // Create version of app v[n].[..n] with global var if null set altnative v1
    let _window = window as any;
    let version = _window.app_version;
    // Loop this.props.urls
    for (let i = 0; i < this.props.urls.length; i++) {
      // Check if the url have query string append it if no add new
      if (this.props.urls[i].includes("?")) {
        this.props.urls[i] += `&v=${version}`;
      } else {
        this.props.urls[i] += `?v=${version}`;
      }
    }
    this.loadExternalUrl(this.props.urls, this.nameLoad, this.props.initModule.bind(this, this.appId));
  }

  loadExternalUrl(urls: Array<string>, name: string, callback: Function) {
    loadjs(urls, name);
    loadjs.ready(name, function () {
      /* foo.js & bar.js loaded */
      callback();
    });
  }

  render(): React.ReactNode {
    return <>
      <div id={this.appId}></div>
    </>
  }
}