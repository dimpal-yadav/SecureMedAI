import tensorflow as tf
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_model(input_shape):
    """Create and compile the heart disease model."""
    try:
        # Ensure input_shape is a tuple
        if not isinstance(input_shape, tuple):
            input_shape = tuple(input_shape)

        logger.info(f"Creating heart disease model with input shape: {input_shape}")

        # Create the model
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=input_shape),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')  # Binary classification
        ])

        # Compile the model
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )

        return model

    except Exception as e:
        logger.error(f"Error creating heart disease model: {str(e)}")
        raise

def create_diabetes_model(input_shape):
    """Create and compile the diabetes model."""
    try:
        # Ensure input_shape is a tuple
        if not isinstance(input_shape, tuple):
            input_shape = tuple(input_shape)

        logger.info(f"Creating diabetes model with input shape: {input_shape}")

        # Create the model - slightly different architecture for diabetes
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=input_shape),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')  # Binary classification
        ])

        # Compile the model
        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy', tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
        )

        return model

    except Exception as e:
        logger.error(f"Error creating diabetes model: {str(e)}")
        raise