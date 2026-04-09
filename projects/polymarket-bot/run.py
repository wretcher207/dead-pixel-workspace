import asyncio
import logging
import sys

from src.core.engine import Engine


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    config_path = sys.argv[1] if len(sys.argv) > 1 else "config.yaml"
    engine = Engine(config_path)

    try:
        asyncio.run(engine.start())
    except KeyboardInterrupt:
        engine.stop()
        print("\nBot stopped.")


if __name__ == "__main__":
    main()
