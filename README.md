# Turborepo Examples

## Scope and build directory not working as expected

When building in a subdirectory of a repo, I'm able to run `turbo run build` and have only the packages beneath it run
```
~/Code/turborepro/packages (main ✗) turbo run build
• Packages in scope: @turborepo_example/bar, @turborepro/foo
• Running build in 2 packages
• Remote caching disabled
@turborepro/foo:build: cache bypass, force executing eee5c8aa1d0b1873
@turborepo_example/bar:build: cache bypass, force executing 98128fcb45dc629a
@turborepro/foo:build:
@turborepro/foo:build: > @turborepro/foo@1.0.0 build /Users/user/Code/turborepro/packages/foo
@turborepro/foo:build: > echo build
@turborepro/foo:build:
@turborepo_example/bar:build:
@turborepo_example/bar:build: > @turborepo_example/bar@1.0.0 build /Users/user/Code/turborepro/packages/bar
@turborepo_example/bar:build: > echo build
@turborepo_example/bar:build:
@turborepo_example/bar:build: build
@turborepro/foo:build: build

 Tasks:    2 successful, 2 total
Cached:    0 cached, 2 total
  Time:    280ms
```

However, if I try to restrict the tasks to just a specific package using [--scope](https://turbo.build/repo/docs/reference/command-line-reference#--scope) I end up seeing tasks
run from a different directory. Given that I set the scope to a specific package I would have expected only the package matching `--scope` to be run, but for some reason a reverse
dependency is triggered

```
~/Code/turborepro/packages (main ✗) turbo run build --scope='@turborepro/foo'
• Packages in scope: @turborepro/baz, @turborepro/foo
• Running build in 2 packages
• Remote caching disabled
@turborepro/foo:build: cache bypass, force executing eee5c8aa1d0b1873
@turborepro/foo:build:
@turborepro/foo:build: > @turborepro/foo@1.0.0 build /Users/user/Code/turborepro/packages/foo
@turborepro/foo:build: > echo build
@turborepro/foo:build:
@turborepro/foo:build: build
@turborepro/baz:build: cache bypass, force executing 0f9190d101cac862
@turborepro/baz:build:
@turborepro/baz:build: > @turborepro/baz@1.0.0 build /Users/user/Code/turborepro/apps/baz
@turborepro/baz:build: > echo build
@turborepro/baz:build:
@turborepro/baz:build: build

 Tasks:    2 successful, 2 total
Cached:    0 cached, 2 total
  Time:    485ms
```

This behavior occurs when using glob patterns as well. The packages in scope don't make sense since I'm in a sub directory that does not include the `@turborepro/baz` package.

```
~/Code/turborepro/packages (main ✗) turbo run build --scope='@turborepro/*'
• Packages in scope: @turborepro/baz, @turborepro/foo
• Running build in 2 packages
• Remote caching disabled
@turborepro/foo:build: cache bypass, force executing eee5c8aa1d0b1873
@turborepro/foo:build:
@turborepro/foo:build: > @turborepro/foo@1.0.0 build /Users/user/Code/turborepro/packages/foo
@turborepro/foo:build: > echo build
@turborepro/foo:build:
@turborepro/foo:build: build
@turborepro/baz:build: cache bypass, force executing 0f9190d101cac862
@turborepro/baz:build:
@turborepro/baz:build: > @turborepro/baz@1.0.0 build /Users/user/Code/turborepro/apps/baz
@turborepro/baz:build: > echo build
@turborepro/baz:build:
@turborepro/baz:build: build

 Tasks:    2 successful, 2 total
Cached:    0 cached, 2 total
  Time:    485ms
```

