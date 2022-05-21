use datafusion::execution::context::SessionContext;

pub(crate) fn get_catalog_names(ctx: &SessionContext) -> Vec<String> {
    let state = ctx.state.read().clone();
    let catalog_list = state.catalog_list;
    catalog_list.catalog_names()
}

pub(crate) fn get_schema_names(ctx: &SessionContext, catalog_name: &str) -> Option<Vec<String>> {
    ctx.catalog(catalog_name).clone().map(|c| {
        c.schema_names()
            .into_iter()
            .filter(|s| s != "information_schema")
            .collect()
    })
}

pub(crate) fn get_table_names(
    ctx: &SessionContext,
    catalog_name: &str,
    schema_name: &str,
) -> Option<Vec<String>> {
    ctx.catalog(catalog_name)
        .clone()
        .and_then(|c| c.schema(schema_name))
        .map(|s| s.table_names())
}
