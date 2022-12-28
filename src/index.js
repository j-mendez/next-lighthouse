import { useEffect } from 'react';
import DOM from './renderer/dom';
import ReportRenderer from './renderer/report-renderer';
import ReportUIFeatures from './renderer/report-ui-features';
import './report-styles.css';
import __html from './templates';

export const Template = () => {
  return <div dangerouslySetInnerHTML={{ __html }} />;
};

// return features to re-use
const generateReport = (initFeatures, darkMode) => {
  try {
    const dom = new DOM(document);

    const renderer = new ReportRenderer(dom);
    const container = document.getElementById(id);

    if (container) {
      renderer.renderReport(json, container);
    }

    const features = new ReportUIFeatures(dom);
    
    if (initFeatures) {
      features.initFeatures(json);
    }
    
    if(darkMode) {
      features._toggleDarkTheme()
    }

    return features;
  } catch (e) {
    console.error(e);
  }
};

export default function ReportViewer({
  id = 'react-lighthouse-viewer',
  json = {},
  initFeatures = false,
  darkMode = false
}) {
  useEffect(() => {
    const exist = json && Object.keys(json).length !== 0;
    const features = exist && generateReport(initFeatures, darkMode);

    return () => {
      if (features) {
        features.dropFeatures();
      }
    };
  }, [json, initFeatures]);

  return (
    <div className="lh-root lh-vars">
      <Template />
      <div id={id} />
    </div>
  );
}
