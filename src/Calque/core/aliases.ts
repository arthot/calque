function loc(id: string): string {
    let l = WinJS.Resources.getString(id);
    if (l != null && !l.empty)
        return l.value;
    else
        return id;
}