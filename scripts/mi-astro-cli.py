#! /usr/bin/env python3
import sys
import os.path

# Definir códigos de colores
RED = '\033[91m'
GREEN = '\033[92m'
BLUE = '\033[94m'
RESET = '\033[0m'  # Resetear el color

# Template para nuevas páginas
PAGE_TEMPLATE = '''---
import Layout from '../layouts/Layout.astro';
---

<Layout title="{page_name}">
<div class="min-h-screen flex items-center justify-center">
    <form class="auth-form" id="forgotPasswordForm">
    <h2 class="text-2xl font-bold text-center mb-6">{page_name_cap}</h2>
    </div>
</Layout>
'''

# Template para nuevos componentes
COMPONENT_TEMPLATE = '''
export default function {component_name}() {{
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">{component_name}</h2>
        </div>
    );
}}
'''

help = '''
  Incorrect Usage:
    mi-astro-cli.py <options> <page-name>

  Options:
    -h, --help      Show help for command
     c, --component, --create-component <component-name>
     p, --page, --create-page <page-name>
     v  --version
'''
def create_page(page_name):
    if not os.path.exists(os.path.join(os.getcwd(), 'src', 'pages')):
        print(f'{RED}✗ Error: src/pages directory not found{RESET}')
        sys.exit(1)
    else:
        print(f'{GREEN}✓ src/pages directory found{RESET}')
    pagePath = os.path.join(os.getcwd(), 'src', 'pages', f'{page_name}.astro')
    if os.path.exists(pagePath):
        print(f'{RED}✗ Error: Page {page_name} already exists at src/pages{RESET}')
        print(f'{RED}✗ Process concluded with error code 1{RESET}')
        sys.exit(1)
    else:
        with open(pagePath, 'w') as file:
            file.write(PAGE_TEMPLATE.format(
                page_name=page_name,
                page_name_cap=page_name.capitalize()
            ))
            file.close()
        print(f'{GREEN}✓ Page {page_name} created successfully{RESET}')

def create_component(component_name):
    if not os.path.exists(os.path.join(os.getcwd(), 'src', 'components')):
        print(f'{RED}✗ Error: src/components directory not found{RESET}')
        sys.exit(1)
    else:
        print(f'{GREEN}✓ src/components directory found{RESET}')

    componentPath = os.path.join(os.getcwd(), 'src', 'components', f'{component_name}.tsx')
    if os.path.exists(componentPath):
        print(f'{RED}✗ Error: Component {component_name} already exists at src/components{RESET}')
        print(f'{RED}✗ Process concluded with error code 1{RESET}')
        sys.exit(1)
    else:
        with open(componentPath, 'w') as file:
            file.write(COMPONENT_TEMPLATE.format(component_name=component_name))
            file.close()
        print(f'{GREEN}✓ Component {component_name} created successfully{RESET}')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(f'{RED}✗ No arguments provided{RESET}')
        print(f'{GREEN}{help}{RESET}')
        sys.exit(1)

    if sys.argv[1] == '-h' or sys.argv[1] == '--help':
        print(f'{GREEN}{help}{RESET}')
        sys.exit(0)

    if sys.argv[1] == 'c' or sys.argv[1] == '--create-component':
        if len(sys.argv) < 3:
            print(f'{RED}✗ Usage: mi-astro-cli.py c <component-name>{RESET}')
            sys.exit(1)
        create_component(sys.argv[2])
    elif sys.argv[1] == 'p' or sys.argv[1] == '--create-page':
        if len(sys.argv) < 3:
            print(f'{RED}✗ Usage: mi-astro-cli.py p <page-name>{RESET}')
            sys.exit(1)
        create_page(sys.argv[2])
    elif sys.argv[1] == '-v' or sys.argv[1] == '--version':
        print(f'{BLUE}mi-astro-cli.py 0.0.1{RESET}')
        sys.exit(0)
    else:
        print(f'{RED}✗ Invalid option{RESET}')
        print(f'{GREEN}{help}{RESET}')
        sys.exit(1)
