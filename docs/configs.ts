export const ConfigureForProduction = ($compileProvider: ng.ICompileProvider) => {
  $compileProvider
    .debugInfoEnabled(process.env.NODE_ENV === 'development')
    .commentDirectivesEnabled(false)
    .cssClassDirectivesEnabled(false);
};

ConfigureForProduction.$inject = ['$compileProvider'];
