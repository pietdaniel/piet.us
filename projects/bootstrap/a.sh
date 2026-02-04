#!/usr/bin/env sh
set -e

# Cross-platform bootstrap script
# Usage: curl https://piet.us/projects/bootstrap/a.sh | sh -s

REPO_URL="https://github.com/pietdaniel/workstation-setup"
INSTALL_DIR="$HOME/workstation-setup"

# Detect OS
detect_os() {
    case "$(uname -s)" in
        Linux*)     echo "linux";;
        Darwin*)    echo "macos";;
        CYGWIN*|MINGW*|MSYS*) echo "windows";;
        *)          echo "unknown";;
    esac
}

# Detect Linux distribution
detect_linux_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        echo "$ID"
    elif [ -f /etc/debian_version ]; then
        echo "debian"
    elif [ -f /etc/redhat-release ]; then
        echo "rhel"
    else
        echo "unknown"
    fi
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install git based on OS
install_git() {
    if command_exists git; then
        echo "Git is already installed"
        return 0
    fi

    echo "Installing git..."
    OS=$(detect_os)

    case "$OS" in
        macos)
            # macOS - use xcode-select which includes git
            if command_exists brew; then
                brew install git
            else
                echo "Installing Xcode Command Line Tools (includes git)..."
                xcode-select --install 2>/dev/null || true
                # Wait for installation
                echo "Please complete the Xcode Command Line Tools installation if prompted,"
                echo "then re-run this script."
                exit 1
            fi
            ;;
        linux)
            DISTRO=$(detect_linux_distro)
            case "$DISTRO" in
                ubuntu|debian|linuxmint|pop)
                    sudo apt-get update
                    sudo apt-get install -y git
                    ;;
                fedora)
                    sudo dnf install -y git
                    ;;
                centos|rhel|rocky|almalinux|amzn)
                    sudo yum install -y git
                    ;;
                arch|manjaro)
                    sudo pacman -Sy --noconfirm git
                    ;;
                alpine)
                    sudo apk add git
                    ;;
                opensuse*|sles)
                    sudo zypper install -y git
                    ;;
                *)
                    echo "Unknown Linux distribution: $DISTRO"
                    echo "Please install git manually and re-run this script."
                    exit 1
                    ;;
            esac
            ;;
        windows)
            # Windows (Git Bash, MSYS2, Cygwin)
            if command_exists pacman; then
                pacman -S --noconfirm git
            elif command_exists choco; then
                choco install git -y
            elif command_exists winget; then
                winget install --id Git.Git -e --source winget
            else
                echo "Please install git manually from https://git-scm.com/download/win"
                echo "Then re-run this script."
                exit 1
            fi
            ;;
        *)
            echo "Unknown operating system"
            echo "Please install git manually and re-run this script."
            exit 1
            ;;
    esac
}

# Clone the repository
clone_repo() {
    if [ -d "$INSTALL_DIR" ]; then
        echo "Directory $INSTALL_DIR already exists"
        echo "Updating existing repository..."
        cd "$INSTALL_DIR"
        git pull
    else
        echo "Cloning $REPO_URL into $INSTALL_DIR..."
        git clone "$REPO_URL" "$INSTALL_DIR"
    fi
}

# Run the setup script
run_setup() {
    SETUP_SCRIPT="$INSTALL_DIR/run.sh"
    if [ -f "$SETUP_SCRIPT" ]; then
        echo "Running setup script..."
        chmod +x "$SETUP_SCRIPT"
        "$SETUP_SCRIPT"
    else
        echo "Error: Setup script not found at $SETUP_SCRIPT"
        exit 1
    fi
}

# Main
main() {
    echo "=== Workstation Bootstrap Script ==="
    echo ""

    install_git
    echo ""

    clone_repo
    echo ""

    run_setup
    echo ""

    echo "=== Bootstrap complete! ==="
}

main
