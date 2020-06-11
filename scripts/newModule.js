const fs = require('fs-extra');
const path = require('path');
const minimist = require('minimist');
const { from, forkJoin } = require('rxjs');
const { toArray, switchMap, mergeMap, map } = require('rxjs/operators');
const DIRS = [
  'builder',
  'interactor',
  'presenter',
  'stores',
  'types',
  'viewModel',
];
const capitalFirstChar = str => str.replace(/^\w/, s => s.toUpperCase());
const getParam = paramName => {
  return minimist(process.argv)[paramName];
};
const MODULE_PATH = path.join(__dirname, '..', 'src', 'pages');
const TEMPLATE_PATH = path.join(MODULE_PATH, 'template');
const TARGET_MODULE_DIR = moduleName => path.join(MODULE_PATH, moduleName);

const readFile = pth => fs.readFile(pth, 'utf8');
const writeFile = (pth, data) => fs.writeFile(pth, data);
const createFolder = async pth => {
  if (await fs.exists(pth)) return pth;
  await fs.mkdir(pth);
  return pth;
};
const composeStore = async (modulePath, moduleName) => {
  const storePth = 'stores/index.ts';
  let templateFile = await readFile(path.join(TEMPLATE_PATH, storePth));
  templateFile = templateFile.replace(
    /(?<=\s)Store(?=\s)/g,
    moduleName + 'Store',
  );
  await writeFile(path.join(modulePath, storePth), templateFile);
};
const composeTypes = async (modulePath, moduleName) => {
  const typesPth = 'types/index.ts';
  const templateFile = await readFile(path.join(TEMPLATE_PATH, typesPth));
  await writeFile(path.join(modulePath, typesPth), templateFile);
  console.log('Types ready');
};
const composeInteractor = async (modulePath, moduleName) => {
  const interactorPth = 'interactor/index.ts';
  let templateFile = await readFile(path.join(TEMPLATE_PATH, interactorPth));
  templateFile = templateFile.replace(/Template/g, moduleName);
  await writeFile(path.join(modulePath, interactorPth), templateFile);
  console.log('Interactor ready');
};
const composePresenter = async (modulePath, moduleName) => {
  const presenterPth = 'presenter/index.ts';
  let templateFile = await readFile(path.join(TEMPLATE_PATH, presenterPth));
  templateFile = templateFile.replace(/Template/g, moduleName);
  await writeFile(path.join(modulePath, presenterPth), templateFile);
  console.log('Presenter ready');
};
const composeViewModel = async (modulePath, moduleName) => {
  const viewModelPth = 'viewModel/index.tsx';
  const componentsPth = 'viewModel/components/functional.tsx';
  let templateFile = await readFile(path.join(TEMPLATE_PATH, viewModelPth));
  templateFile = templateFile.replace(/Template/g, moduleName);
  await writeFile(path.join(modulePath, viewModelPth), templateFile);
  await createFolder(path.join(modulePath, '/viewModel/components'));
  await fs.copy(
    path.join(TEMPLATE_PATH, componentsPth),
    path.join(modulePath, componentsPth),
  );
  console.log('ViewModel ready');
};
const composeBuilder = async (modulePath, moduleName) => {
  const builderPth = 'builder/index.tsx';
  let templateFile = await readFile(path.join(TEMPLATE_PATH, builderPth));
  templateFile = templateFile.replace(/Template/g, moduleName);
  await writeFile(path.join(modulePath, builderPth), templateFile);
  console.log('Builder ready');
};
// -n name of the module
(function() {
  let moduleName = getParam('n');
  // console.log(moduleName)
  if (!moduleName || !moduleName.length) {
    console.error('Please provide a module name, use -n someModuleName');
    return;
  }
  moduleName = capitalFirstChar(moduleName);
  const tagetModuleDir = TARGET_MODULE_DIR(moduleName);
  from(createFolder(tagetModuleDir))
    .pipe(
      switchMap(_ => from(DIRS)),
      map(dir => path.join(tagetModuleDir, dir)),
      toArray(),
      switchMap(dirs => forkJoin(dirs.map(createFolder))),
      switchMap(_ =>
        forkJoin(
          composeBuilder(tagetModuleDir, moduleName),
          composeInteractor(tagetModuleDir, moduleName),
          composePresenter(tagetModuleDir, moduleName),
          composeStore(tagetModuleDir, moduleName),
          composeTypes(tagetModuleDir, moduleName),
          composeViewModel(tagetModuleDir, moduleName),
        ),
      ),
    )
    .subscribe({
      error: err => console.log('ERROR', err),
      complete: () => console.log('COMPLETE'),
    });
})();
